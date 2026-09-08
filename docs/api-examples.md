# API Examples

Example `curl` commands for the base-app REST API. The full contract is
described in [openapi.yaml](./openapi.yaml).

All endpoints live under `http://localhost:3000/api/v1`.

## Health check

```bash
curl http://localhost:3000/api/v1/health
```

```json
{ "status": "ok", "uptime": 12.34, "timestamp": "2026-09-08T00:00:00.000Z" }
```

## Create an item

```bash
curl -X POST http://localhost:3000/api/v1/items \
  -H 'Content-Type: application/json' \
  -d '{"name":"my first item"}'
```

```json
{
  "item": {
    "name": "my first item",
    "id": "0f8fad5b-d9cb-469f-a165-70867728950e",
    "createdAt": "2026-09-08T00:00:00.000Z",
    "updatedAt": "2026-09-08T00:00:00.000Z"
  }
}
```

## List items (paginated)

```bash
curl 'http://localhost:3000/api/v1/items?page=1&pageSize=10'
```

```json
{
  "data": [],
  "page": 1,
  "pageSize": 10,
  "total": 0,
  "totalPages": 1
}
```

## Get an item

```bash
curl http://localhost:3000/api/v1/items/0f8fad5b-d9cb-469f-a165-70867728950e
```

## Update an item

```bash
curl -X PUT http://localhost:3000/api/v1/items/0f8fad5b-d9cb-469f-a165-70867728950e \
  -H 'Content-Type: application/json' \
  -d '{"name":"renamed item"}'
```

## Delete an item

```bash
curl -X DELETE http://localhost:3000/api/v1/items/0f8fad5b-d9cb-469f-a165-70867728950e
# HTTP 204 No Content
```

## Errors

Failures return a structured JSON body:

```json
{
  "error": {
    "message": "Validation failed",
    "statusCode": 400,
    "details": [{ "field": "name", "message": "String must contain at least 1 character(s)" }]
  }
}
```
