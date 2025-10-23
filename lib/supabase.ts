import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Comment } from '@/types';

let supabaseInstance: SupabaseClient | null = null;

/**
 * Get or create Supabase client (lazy initialization)
 * This prevents build-time errors when environment variables aren't set
 */
function getSupabaseClient(): SupabaseClient {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
    );
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseInstance;
}

// Export for backward compatibility (but use getSupabaseClient internally)
export const supabase = {
  get client() {
    return getSupabaseClient();
  }
};

/**
 * Fetch all comments for a specific trek (sorted by newest first)
 */
export async function getComments(trekSlug: string): Promise<Comment[]> {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('comments')
      .select('*')
      .eq('trek_slug', trekSlug)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
      return [];
    }

    return (data || []).map((row) => ({
      id: row.id,
      trek_slug: row.trek_slug,
      name: row.name,
      email: row.email,
      comment: row.comment,
      status: 'approved', // All comments are auto-approved in Supabase
      created_at: row.created_at,
    }));
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}

/**
 * Create a new comment in Supabase
 */
export async function createComment(
  trekSlug: string,
  name: string,
  email: string,
  comment: string,
  ipHash?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const client = getSupabaseClient();
    const { error } = await client.from('comments').insert([
      {
        trek_slug: trekSlug,
        name: name.trim(),
        email: email.trim(),
        comment: comment.trim(),
        ip_hash: ipHash || null,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Supabase insert error:', error);
      return {
        success: false,
        error: error.message || 'Failed to submit comment',
      };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error creating comment:', error);
    return {
      success: false,
      error: error.message || 'Failed to submit comment. Please try again.',
    };
  }
}

/**
 * Hash IP address for rate limiting (simple hash)
 */
export function hashIP(ip: string): string {
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * Check rate limit: Has this IP submitted a comment recently?
 */
export async function checkRateLimit(ipHash: string): Promise<boolean> {
  try {
    const client = getSupabaseClient();
    // Check if IP has submitted in last 30 minutes
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();

    const { data, error } = await client
      .from('comments')
      .select('id')
      .eq('ip_hash', ipHash)
      .gte('created_at', thirtyMinutesAgo)
      .limit(1);

    if (error) {
      console.error('Rate limit check error:', error);
      return true; // Allow if check fails
    }

    // If records found, rate limit exceeded
    return (data || []).length === 0;
  } catch (error) {
    console.error('Error checking rate limit:', error);
    return true; // Allow if check fails
  }
}

/**
 * Basic spam detection - check for common spam patterns
 */
export function detectSpam(comment: string): boolean {
  const spamPatterns = [
    /\b(viagra|cialis|casino|poker|lottery|winner|prize)\b/i,
    /\b(click here|buy now|limited offer|act now)\b/i,
    /(http|https):\/\/[^\s]{30,}/gi, // Very long URLs
    /\b\d{10,}\b/, // Long number sequences
    /(.)\1{10,}/, // Repeated characters (aaaaaaaaaa)
  ];

  return spamPatterns.some((pattern) => pattern.test(comment));
}

/**
 * Check if text contains excessive links
 */
export function hasExcessiveLinks(text: string): boolean {
  const urlPattern = /(http|https|www\.)/gi;
  const matches = text.match(urlPattern);
  return matches ? matches.length > 2 : false;
}
