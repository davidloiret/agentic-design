# SSL Certificate Setup

Place your SSL certificates in this directory:

- `fullchain.pem` - Your certificate chain file
- `privkey.pem` - Your private key file

## Using Let's Encrypt (Recommended)

```bash
# Install certbot
sudo apt-get update
sudo apt-get install certbot

# Generate certificates
sudo certbot certonly --standalone -d backend.agentic-design.ai

# Copy certificates to this directory
sudo cp /etc/letsencrypt/live/backend.agentic-design.ai/fullchain.pem ./
sudo cp /etc/letsencrypt/live/backend.agentic-design.ai/privkey.pem ./
sudo chown $(whoami):$(whoami) *.pem
sudo chmod 644 fullchain.pem
sudo chmod 600 privkey.pem
```

## Certificate Renewal

Set up auto-renewal with cron:
```bash
0 2 * * * /usr/bin/certbot renew --quiet && docker-compose -f docker-compose.prod.yml restart nginx
```