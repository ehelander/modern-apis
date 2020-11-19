# Expose the entire bucket object, not just a string.
output "bucket" {
  value = aws_s3_bucket.web_bucket
}

# EC2 instances will use this to access the bucket.
output "instance_profile" {
  value = aws_iam_instance_profile.instance_profile
}

