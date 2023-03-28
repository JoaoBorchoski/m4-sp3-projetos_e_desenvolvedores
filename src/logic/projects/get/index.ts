import { client } from "./../../../database/db";
import { QueryResult } from "pg";
import { QueryConfig } from "pg";
import { Request, Response } from "express";

export const getProjects = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const queryString: string = `
    
    SELECT * FROM projects p
    LEFT JOIN projects_technologies pt ON  p.project_id = pt.id_project
    ORDER BY p.project_id;
    `;

    const QueryResult = await client.query(queryString);

    return res.json(QueryResult.rows);
};

export const getProjectsById = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const id: number = +req.params.id;
    const queryString: string = `
    
    SELECT * FROM projects p
    JOIN projects_technologies pt ON  p.project_id = pt.id_project
    WHERE p.project_id = $1;
    `;

    const QueryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };

    const QueryResult = await client.query(QueryConfig);

    return res.json(QueryResult.rows);
};
