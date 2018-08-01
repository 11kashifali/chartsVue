import pymysql

# Connect to the database
conn = pymysql.connect(host='pglvm2008-v02.png.intel.com',
                             user='gio_db_reader',
                             password='reader@123',
                             database='bottomline_dev_1')

cursor = conn.cursor()
cursor.execute("SELECT page_id, COUNT(page_id) AS TopPage_View FROM analytic GROUP BY page_id ORDER BY TopPage_View desc;")
results = cursor.fetchall()
for r in results:
    print(r)
cursor.close()
conn.close()
