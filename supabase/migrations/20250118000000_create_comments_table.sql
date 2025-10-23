-- Create comments table for trek feedback
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trek_slug TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  comment TEXT NOT NULL,
  ip_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT comment_length_check CHECK (char_length(comment) >= 10 AND char_length(comment) <= 500),
  CONSTRAINT name_length_check CHECK (char_length(name) >= 1 AND char_length(name) <= 50),
  CONSTRAINT email_format_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create index on trek_slug for faster queries
CREATE INDEX IF NOT EXISTS idx_comments_trek_slug ON comments(trek_slug);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

-- Create index on ip_hash for rate limiting
CREATE INDEX IF NOT EXISTS idx_comments_ip_hash ON comments(ip_hash);

-- Enable Row Level Security (RLS)
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to read comments (public access)
CREATE POLICY "Anyone can read comments"
  ON comments
  FOR SELECT
  USING (true);

-- Policy: Allow insert with rate limiting check (will be enforced in application)
CREATE POLICY "Anyone can insert comments"
  ON comments
  FOR INSERT
  WITH CHECK (true);

-- Optional: Add comment for documentation
COMMENT ON TABLE comments IS 'Stores user feedback and comments for trek pages';
COMMENT ON COLUMN comments.trek_slug IS 'Slug identifier for the trek (e.g., langtang-trek)';
COMMENT ON COLUMN comments.name IS 'Commenter name (1-50 characters)';
COMMENT ON COLUMN comments.email IS 'Commenter email (not displayed publicly)';
COMMENT ON COLUMN comments.comment IS 'Comment text (10-500 characters)';
COMMENT ON COLUMN comments.ip_hash IS 'Hashed IP address for rate limiting';
COMMENT ON COLUMN comments.created_at IS 'Timestamp when comment was created';
