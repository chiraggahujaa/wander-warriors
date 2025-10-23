import { Comment } from '@/types';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = 'Comments';

const AIRTABLE_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

interface AirtableRecord {
  id: string;
  fields: {
    trek_slug: string;
    name: string;
    email?: string;
    comment: string;
    status: 'pending' | 'approved' | 'spam';
    ip_hash?: string;
    created_at: string;
  };
  createdTime: string;
}

interface AirtableResponse {
  records: AirtableRecord[];
  offset?: string;
}

/**
 * Fetch approved comments for a specific trek
 */
export async function getApprovedComments(trekSlug: string): Promise<Comment[]> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.error('Airtable credentials not configured');
    return [];
  }

  try {
    // Build filter formula to get only approved comments for this trek
    const filterFormula = `AND({trek_slug}='${trekSlug}', {status}='approved')`;
    const sortParam = 'sort[0][field]=created_at&sort[0][direction]=desc';

    const url = `${AIRTABLE_API_URL}?filterByFormula=${encodeURIComponent(filterFormula)}&${sortParam}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status}`);
    }

    const data: AirtableResponse = await response.json();

    return data.records.map((record) => ({
      id: record.id,
      trek_slug: record.fields.trek_slug,
      name: record.fields.name,
      email: record.fields.email,
      comment: record.fields.comment,
      status: record.fields.status,
      created_at: record.fields.created_at || record.createdTime,
    }));
  } catch (error) {
    console.error('Error fetching comments from Airtable:', error);
    return [];
  }
}

/**
 * Create a new comment in Airtable (with pending status)
 */
export async function createComment(
  trekSlug: string,
  name: string,
  comment: string,
  email: string,
  ipHash?: string
): Promise<{ success: boolean; error?: string }> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    return {
      success: false,
      error: 'Comment system is not configured. Please contact us directly.',
    };
  }

  try {
    const response = await fetch(AIRTABLE_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              trek_slug: trekSlug,
              name: name,
              email: email,
              comment: comment,
              status: 'pending', // All comments start as pending
              ip_hash: ipHash || '',
              created_at: new Date().toISOString(),
            },
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to submit comment');
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error creating comment in Airtable:', error);
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
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    return true; // Allow if Airtable not configured
  }

  try {
    // Check if IP has submitted in last 30 minutes
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();
    const filterFormula = `AND({ip_hash}='${ipHash}', IS_AFTER({created_at}, '${thirtyMinutesAgo}'))`;

    const url = `${AIRTABLE_API_URL}?filterByFormula=${encodeURIComponent(filterFormula)}&maxRecords=1`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return true; // Allow if check fails
    }

    const data: AirtableResponse = await response.json();

    // If records found, rate limit exceeded
    return data.records.length === 0;
  } catch (error) {
    console.error('Error checking rate limit:', error);
    return true; // Allow if check fails
  }
}
