import { client } from "./../../../database/db";
import { QueryConfig } from "pg";
import { Request, Response } from "express";
import format from "pg-format";
import { developerResult } from "../../../interface/types";

export const updateDeveloper = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const id: number = +req.params.id;

    const queryString: string = format(
        `
        UPDATE 
            developers
        SET
            (%I) = ROW(%L)
        WHERE 
            id = $1
        RETURNING *;
    `,
        Object.keys(req.body),
        Object.values(req.body)
    );

    const QueryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };

    const QueryResult: developerResult = await client.query(QueryConfig);

    return res.json(QueryResult.rows[0]);
};

export const updateDeveloperInfo = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const id: number = +req.params.id;

    const queryStringDeveloper: string = `
    SELECT 
        *
    FROM
        developers  
    WHERE
        id = $1;
    `;

    const queryConfigDeveloper: QueryConfig = {
        text: queryStringDeveloper,
        values: [id],
    };

    const queryResultDeveloper: developerResult = await client.query(
        queryConfigDeveloper
    );

    const id_info = queryResultDeveloper.rows[0].developerInfoId;

    const queryStringUpdate: string = format(
        `
        UPDATE
            developer_infos
        SET
            (%I) = ROW(%L)
        WHERE
            id_info = $1
        RETURNING *;
    `,
        Object.keys(req.body),
        Object.values(req.body)
    );

    const QueryConfigUpdate: QueryConfig = {
        text: queryStringUpdate,
        values: [id_info],
    };

    const QueryResultUpdate: developerResult = await client.query(
        QueryConfigUpdate
    );

    const queryReturn: string = `
    SELECT 
        * 
    FROM 
        developers d 
    JOIN 
        developer_infos di 
    ON 
        d.id = di.id_info
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
