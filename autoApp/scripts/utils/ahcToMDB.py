import pymssql
import sys
import mongoConn
import json
import datetime


def connect():

    server = "S660W1088.group.rwe.com"
    port = "1433"
    user = "GROUP\\UI337014"
    password = "Ykbfedw9e!"
    database = "ahc1.5.4"

    conn = pymssql.connect(
        server = server,
        port = port,
        user = user,
        password = password,
        database = database
    )
    c = conn.cursor()
    print (c)

   # print (conn)
    
    # GET THE HEADERS
    c.execute("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.columns WHERE TABLE_NAME = 'ScriptResponse'")
    rows = c.fetchall()
    headers = []
    for row in rows:
        rowResult = list(row)[0]
        headers.append(rowResult)
    print (headers)
    headers = ["Application name","Agent name","Script name","Output","Raw Output","Status","Start time","End time","Last modfied date","Result","Result Colour", "Created date","Execution start time","Execution end time"]

    sqlSELECT = "SELECT a.ApplicationName,agent.AgentName, script.ScriptName, s.output, s.rawoutput,s.status,s.starttime,s.endtime,s.lastmodifieddate,s.result,s.resultcolor,s.createddate,executionstarttime,executionendtime "
    sqlFROM = "FROM ScriptResponse as s,ApplicationMaster as a,AgentMaster as agent, ScriptMaster as script "
    sqlWHERE = "WHERE s.ApplicationID = a.ApplicationID AND s.AgentID = agent.AgentID AND s.ScriptID = script.ScriptID "
    
    c.execute(sqlSELECT + sqlFROM + sqlWHERE)
    rows = c.fetchall()
    rowResults = []
    for row in rows:
        template = []
        template += list(row)
        rowResults.append(template)
    #print (rowResults)

    #c.execute("SELECT A_NAME FROM UNIX_1")
    #rows = c.fetchall()
    #print (rows)
    holder  = []
##        for row in rowResults:
##        dateNow = row[11]
##        dateNow = dateNow.strftime('%d/%m/%Y')
##        dictHolder = {}
##        dictTop = {}
##        for head in range(len(headers)):
##            dictHolder[headers[head]] = row[head]
##        dictTop[dateNow] = dictHolder
##        holder.append(dictTop)
    """ ----- IF DATE IS NOT WHAT YOU WANT UNCOMMENT ABOVE ---"""
    for row in rowResults:
        dictHolder = {}
        for head in range(len(headers)):
            dictHolder[headers[head]] = row[head]
        holder.append(dictHolder)
    
    #print (holder[10])
    #c.execute("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.columns WHERE TABLE_NAME = 'ScriptMaster'")
    #rows = c.fetchall()
    #print (rows)
    conn.commit()
    conn.close()
    for row in rowResults:
        if row[10] is not None:
            #print (row)
            pass
    mongoConn.fillDB(holder)



connect()
