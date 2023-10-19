start-server:
	docker-compose up -d --build
stop-server:
	docker-compose down
empty-database:
	docker-compose down
	docker volume rm qasr-his_postgres-data