start-server:
	docker-compose up  --build
stop-server:
	docker-compose down
empty-database:
	docker-compose down
	docker volume rm qasr-his_postgres-data
empty-start: empty-database start-server

