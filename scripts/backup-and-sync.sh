#!/bin/bash

######################################################################
##
##   MongoDB Database Backup Script
##   Written By: Rahul Kumar
##   URL: https://tecadmin.net/shell-script-backup-mongodb-database/
##   Update on: June 20, 2020
##
######################################################################

export PATH=/bin:/usr/bin:/usr/local/bin

TODAY=$(date +"%d%b%Y")

######################################################################
######################################################################

DB_BACKUP_PATH=$HOME'/backup/mongo'
MONGO_HOST='mongodb+srv://counterclaster.9imvrz0.mongodb.net'
MONGO_PORT='27017'

# If MongoDB is protected with a username password.
# Set AUTH_ENABLED to 1
# and add MONGO_USER and MONGO_PASSWD values correctly

AUTH_ENABLED=1
MONGO_USER='backup'
MONGO_PASSWD='NONE'

SYNC_LOCAL_WITH_REMOTE="FALSE"

POSITIONAL_ARGS=()

while [[ $# -gt 0 ]]; do
	case $1 in
	-p | --password)
		MONGO_PASSWD="$2"
		shift # past argument
		shift # past value
		;;
	-s | --sync)
		SYNC_LOCAL_WITH_REMOTE="TRUE"
		shift # past argument
		;;

	-* | --*)
		echo "Unknown option $1"
		exit 1
		;;
	*)
		POSITIONAL_ARGS+=("$1") # save positional arg
		shift                   # past argument
		;;

	esac
done

set -- "${POSITIONAL_ARGS[@]}" # restore positional parameters

if [ $MONGO_PASSWD = "NONE" ]; then
	echo "Password is required. -p | --password"
	exit 1
fi

DATABASE_NAME='Counter'

## Number of days to keep a local backup copy
BACKUP_RETAIN_DAYS=30

######################################################################
######################################################################

PATH_TO_ARCHIVE="${DB_BACKUP_PATH}/${DATABASE_NAME}_${TODAY}.gz"

mkdir -p ${DB_BACKUP_PATH}/${TODAY}

AUTH_PARAM=""

if [ ${AUTH_ENABLED} -eq 1 ]; then
	AUTH_PARAM=" --username ${MONGO_USER} --password ${MONGO_PASSWD} "
fi

# Mongodump
echo "Running backup for selected databases..."
mongodump --uri "${MONGO_HOST}" --port ${MONGO_PORT} --db ${DATABASE_NAME} ${AUTH_PARAM} --gzip --archive="${PATH_TO_ARCHIVE}"

# Archive path echo
echo "Archive path: ${PATH_TO_ARCHIVE}"

# Sycn
if [ $SYNC_LOCAL_WITH_REMOTE = "TRUE" ]; then
	echo "Drop local ${DATABASE_NAME} ..."
	mongosh ${DATABASE_NAME} --eval "db.dropDatabase()"

	echo "Restore backup ..."
	mongorestore --gzip --archive="${PATH_TO_ARCHIVE}" --nsFrom ${DATABASE_NAME}.* --nsTo ${DATABASE_NAME}.* --host localhost --port ${MONGO_PORT}
fi

######## Remove backups older than {BACKUP_RETAIN_DAYS} days  ########

DBDELDATE=$(date +"%d%b%Y" --date="${BACKUP_RETAIN_DAYS} days ago")

if [ ! -z ${DB_BACKUP_PATH} ]; then
	cd ${DB_BACKUP_PATH}
	if [ ! -z ${DBDELDATE} ] && [ -d ${DBDELDATE} ]; then
		rm -rf ${DBDELDATE}
	fi
fi

######################## End of script ##############################
