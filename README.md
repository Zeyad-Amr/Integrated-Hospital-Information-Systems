# Qasr-HIS

## Filter Rules

The following filter rules can be used when applying filters to your data:

### `EQUALS` (eq)

- Example: `field:eq:value`

### `NOT_EQUALS` (neq)

- Example: `field:neq:value`

### `GREATER_THAN` (gt)

- Example: `field:gt:value`

### `GREATER_THAN_OR_EQUALS` (gte)

- Example: `field:gte:value`

### `LESS_THAN` (lt)

- Example: `field:lt:value`

### `LESS_THAN_OR_EQUALS` (lte)

- Example: `field:lte:value`

### `LIKE` (like)

- Description: it checks if string contains specific pattern
- Example: `field:like:pattern`

### `STARTS_WITH` (stw)

- Example: `name:stw:ahmed`

### `IS_NULL` (isnull)

- Example: `field:isnull`

### `IS_NOT_NULL` (isnotnull)

- Example: `field:isnotnull`

### `ANY` (any)

- Description: it checks if the value of the field is in the list of values
- Example: `field:any:value1,value2,value3`

## Sorting Rules

- Example: `field:asc`
- Example: `field:desc`

# Model

- to run the model
- 1. pip install -r requirements.txt
- 2. python app.py
- API -> http://localhost:5000/extractdata
- API body -> accepts 2 images in form data with names {front:img, back:img}
- status codes: 200 success, 420: failed to detect name, 421: failed to detect national id , 422: check national id
