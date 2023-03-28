import { query, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../../../database/db";
import { developerResult } from "../../../interface/types";

export const getDevelopers = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const queryString: string = `
    SELECT 
    * 
    FROM 
        developers d 
    LEFT JOIN 
        developer_infos di ON d."developerInfoId" = di.id_info
    ORDER BY
        id;
    `;

    const queryResult: developerResult = await client.query(queryString);

    return res.json(queryResult.rows);
};

export const getDeveloperById = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const id: number = +req.params.id;

    const queryString: string = `
    SELECT 
        * 
    FROM 
        developers d 
    JOIN 
        developer_infos di ON d."developerInfoId" = di.id_info
    WHERE 
        d.id = $1;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };

    const queryResult: developerResult = await client.query(queryConfig);

    console.log(queryResult.rows[0]);

    return res.json(queryResult.rows[0]);
};

export const getDeveloperProjects = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const id: number = +req.params.id;

    const queryString: string = `
    SELECT 
        * 
    FROM 
        developers d 
    JOIN 
        projects p 
    ON 
        d.id = p."developerId"
    WHERE 
        p."developerId" = $1;
    `;

    const QueryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };

    const QueryResult: developerResult = await client.query(QueryConfig);

    return res.json(QueryResult.rows);
};
