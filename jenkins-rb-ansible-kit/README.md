# Instructions

1. Copy the following to a new directory:
    * nginx_templates
2. Change the hostname below to a fully-qualified domain name you'll be able to use for the server.
    - Search for "localhost" for the default.
    - See DOMAIN and NGINX_HOST below. To temporarily test a hostname, you can modify /etc/hosts on Linux or macOS and alias it to your IP address.

> NOTE: If you change this later, you will need to edit the sitedir volume's conf/settings_local.py to include the new hostname in ALLOWED_HOSTS, and change the hostname in Review Board's Admin UI -> General Settings page.

3. Change the database passwords below to something secure.
    - See MYSQL_ROOT_PASSWORD, MYSQL_PASSWORD, and DATABASE_PASSWORD.
4. Change the company name for your server.
    - See COMPANY below.
5. Go through this file and search for "CHANGEME" for other settings you may want to change.
6. Run: docker-compose up
7. Access http://<hostname>/

# Data Storage

This example configuration will create two directories for storage:

db_data/
    The MySQL database contents.
    This CANNOT be shared across multiple MySQL database servers.
sitedir/
    Review Board site directory content (static media files, data, and
    configuration).
    This CAN be shared across multiple Review Board server instances, and
    Nginx instances.

# Production Use

As this is only a sample configuration, you'll likely want to make other changes for production use, such as:

1. Setting up a load balancer with SSL enabled.
2. Separating out the database and memcached server for other Review Board
   instances to use.
3. Making sure only port 80 is accessible on the network.
These are all beyond the scope of this example configuration.
You should also go through this file, read the comments, and change any
configuration needed for your install.

---

Ref: [Reviewboard Official GitHub Repository](https://github.com/reviewboard/reviewboard/blob/master/contrib/docker/examples/docker-compose.mysql.yaml)
