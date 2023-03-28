import { client } from "../../../database/db";
import { QueryConfig, QueryResult } from "pg";
import { Request, Response } from "express";
import format from "pg-format";
import {
    developerResult,
    iDeveloper,
    iDeveloperInfo,
} from "../../../interface/types";

export const newDeveloper = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const developer: iDeveloper = req.body;

    const querySting: string = format(
        `
    INSERT INTO 
        developers (%I)
    VALUES 
        (%L)
    RETURNING *;
    `,
        Object.keys(developer),
        Object.values(developer)
    );

    const QueryResult: developerResult = await client.query(querySting);

    return res.status(201).json(QueryResult.rows[0]);
};

export const newDeveloperInfo = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const id: number = +req.params.id;
    const devInfo: iDeveloperInfo = req.body;

    const queryStringInfo: string = format(
        `
    INSERT INTO 
        developer_infos (%I)
    VALUES 
        (%L)
    RETURNING *;
    `,
        Object.keys(devInfo),
        Object.values(devInfo)
    );

    const QueryResultInfo = await client.query(queryStringInfo);
    const infoId = QueryResultInfo.rows[0].id_info;

    const queryStringUpdate: string = `
    UPDATE
        developers
    SET
        "developerInfoId" = $1
    WHERE
        id = $2;
    `;

    const queryConfigUpdate: QueryConfig = {
        text: queryStringUpdate,
        values: [infoId, id],
    };

    await client.query(queryConfigUpdate);

    const queryReturn: string = `
    SELECT 
        * 
    FROM 
        developers d 
    JOIN 
        developer_infos di 
    ON 
        d."developerInfoId" = di.id_info
    WHERE 
        di.id_info = $1;
    `;

    const queryConfigReturn: QueryConfig = {
        text: queryReturn,
        values: [id],
    };

    const QueryResultReturn = await client.query(queryConfigReturn);

    return res.json(QueryResultReturn.rows[0]);
};
