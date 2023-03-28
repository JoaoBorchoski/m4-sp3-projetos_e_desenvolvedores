import { client } from "./../../../database/db";
import { QueryConfig } from "pg";
import { Request, Response } from "express";

export const deleteProject = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const id: number = +req.params.id;

    const queryString: string = `
    DELETE FROM projects
    WHERE project_id = $1
    `;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };
    const queryResult = await client.query(queryConfig);

    return res.status(200).send();
};

export const deleteProjectTech = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const id: number = +req.params.id;
    const name: string = req.params.name;

    const queryName = `
    SELECT * FROM technologies
    WHERE name = $1
    `;
    const queryConfigName: QueryConfig = {
        text: queryName,
        values: [name],
    };
    const queryResultName = await client.query(queryConfigName);
    const idName = queryResultName.rows[0].id;

    const queryString = `
    DELETE FROM
        projects_technologies pt
    WHERE
        pt.technology_id = $1 AND pt.id_project = $2
    `;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [idName, id],
    };
    await client.query(queryConfig);

    return res.status(200).send();
};
