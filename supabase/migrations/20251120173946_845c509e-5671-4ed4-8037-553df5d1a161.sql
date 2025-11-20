-- Add DELETE policy for support_messages to allow authenticated users to delete
CREATE POLICY "Authenticated users can delete support messages"
ON support_messages
FOR DELETE
TO authenticated
USING (true);