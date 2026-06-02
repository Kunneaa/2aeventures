# Huong Dan Chuyen Domain 2aeventures.com

Tai thoi diem kiem tra, website Docker dang chay local tren may server, nhung domain `2aeventures.com` van dang tro ve Squarespace.

## Muc Tieu

Sau khi cau hinh xong:

```text
https://2aeventures.com
https://www.2aeventures.com
```

se tro ve website Docker cua project nay.

## Hien Trang Can Biet

Public IP hien tai cua mang:

```text
115.79.137.197
```

Domain hien tai dang tro ve Squarespace:

```text
2aeventures.com      -> 198.185.159.144, 198.49.23.144, ...
www.2aeventures.com  -> ext-sq.squarespace.com
```

May chay Docker trong mang noi bo can co IP co dinh. Lan kiem tra gan nhat may nay la:

```text
192.168.20.89
```

Neu IP noi bo thay doi, hay dung IP moi khi cau hinh router.

## Buoc 1: Chuan Bi May Chay Web

Tren may chay Docker:

```bash
docker compose ps
curl http://127.0.0.1/healthz
curl -I http://127.0.0.1/vi
```

Ket qua mong doi:

```text
frontend: healthy
backend: healthy
caddy: running
/healthz: ok
/vi: 200
```

## Buoc 2: Dat IP Noi Bo Co Dinh

Vao trang quan tri router, tim muc DHCP reservation/static lease.

Gan IP co dinh cho may chay Docker, vi du:

```text
192.168.20.89
```

Muc dich: tranh viec restart router/may lam IP thay doi, khien port forwarding bi sai.

## Buoc 3: Port Forwarding Tren Router

Trong router, cau hinh:

```text
WAN 80   -> 192.168.20.89:80
WAN 443  -> 192.168.20.89:443
```

Neu router dang bat remote management tren port `80` hoac `443`, hay tat remote management hoac doi sang port khac.

Sau khi forward, kiem tra public IP:

```bash
curl -I http://115.79.137.197/healthz
```

Ket qua dung nen tra ve `200 OK` hoac body `ok`.

Neu van bi redirect ve cong quan tri router hoac khong ket noi duoc, port forwarding chua dung hoac nha mang dang chan/dung CGNAT.

## Buoc 4: Doi DNS Cua Domain

Vao noi dang quan ly DNS cua `2aeventures.com`.

Xoa cac record Squarespace hien tai:

```text
A      @      198.185.159.144
A      @      198.49.23.144
A      @      198.185.159.145
A      @      198.49.23.145
CNAME  www    ext-sq.squarespace.com
```

Tao record moi:

```text
Type   Name   Value
A      @      115.79.137.197
A      www    115.79.137.197
```

TTL co the de mac dinh hoac dat ngan, vi du `300` giay neu DNS provider cho phep.

Kiem tra DNS:

```bash
dig +short 2aeventures.com
dig +short www.2aeventures.com
```

Ket qua dung:

```text
115.79.137.197
```

DNS co the can vai phut den vai gio de propagate.

## Buoc 5: Tao File .env Production

Tai root project, tao file `.env`:

```bash
cp .env.example .env
```

Noi dung can co:

```dotenv
APP_HOSTS=2aeventures.com,www.2aeventures.com
APP_ORIGIN=https://2aeventures.com
HTTP_PORT=80
HTTPS_PORT=443

BACKEND_ENV=production
BACKEND_LOG_LEVEL=info
BACKEND_CORS_ORIGINS=https://2aeventures.com,https://www.2aeventures.com
BACKEND_ADMIN_TOKEN=replace-with-a-long-random-token
BACKEND_DATA_DIR=/app/data

NEXT_PUBLIC_API_URL=/api/v1
```

Doi `BACKEND_ADMIN_TOKEN` thanh mot chuoi dai va kho doan.

Khong push file `.env` len Git.

## Buoc 6: Deploy Lai Docker

Chay:

```bash
./scripts/deploy.sh
```

Hoac chay truc tiep:

```bash
docker compose --env-file .env -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

Kiem tra container:

```bash
docker compose --env-file .env -f docker-compose.yml -f docker-compose.prod.yml ps
docker compose --env-file .env -f docker-compose.yml -f docker-compose.prod.yml logs --tail=100 caddy
```

Caddy se tu cap HTTPS khi:

- DNS da tro dung ve public IP.
- Port `80` va `443` vao duoc may Docker.
- `APP_HOSTS` dung domain that.

## Buoc 7: Kiem Tra Website

Kiem tra HTTP health:

```bash
curl -I http://2aeventures.com/healthz
```

Kiem tra HTTPS:

```bash
curl -I https://2aeventures.com/vi
curl -I https://www.2aeventures.com/vi
```

Mo trinh duyet:

```text
https://2aeventures.com
https://www.2aeventures.com
```

## Neu Khong Truy Cap Duoc

Kiem tra theo thu tu:

1. Docker local co chay khong:

```bash
docker compose ps
curl http://127.0.0.1/healthz
```

2. May trong LAN co vao duoc khong:

```text
http://192.168.20.89/vi
```

3. Public IP co vao duoc khong:

```bash
curl -I http://115.79.137.197/healthz
```

4. Domain co tro dung IP khong:

```bash
dig +short 2aeventures.com
dig +short www.2aeventures.com
```

5. Caddy log co loi cap HTTPS khong:

```bash
docker compose logs --tail=200 caddy
```

## Truong Hop Mang Bi CGNAT Hoac Chan Port

Neu router khong nhan public IP truc tiep, hoac port `80/443` khong forward duoc, A record se khong du de public website.

Khi do dung mot trong cac cach sau:

- Cloudflare Tunnel
- ngrok
- Tailscale Funnel
- Chuyen sang may co public IP rieng

Voi project nay, cach gon nhat neu bi CGNAT la Cloudflare Tunnel.

## Checklist Cuoi

- [ ] Docker local chay `healthy`.
- [ ] Router da reserve IP cho may Docker.
- [ ] Router da forward `80` va `443`.
- [ ] DNS `2aeventures.com` tro ve `115.79.137.197`.
- [ ] DNS `www.2aeventures.com` tro ve `115.79.137.197`.
- [ ] `.env` da dat `APP_HOSTS=2aeventures.com,www.2aeventures.com`.
- [ ] Da chay deploy lai Docker.
- [ ] `https://2aeventures.com/vi` truy cap duoc.
