import { QueryConfig, QueryResult } from "pg";
import { client } from "./../../../database/db";
import format from "pg-format";
import { Request, Response } from "express";
import { iNewProject } from "../../../interface/types";

export const newProject = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const project: iNewProject = req.body;

    const querySting: string = format(
        `
    INSERT INTO 
        projects (%I)
    VALUES 
        (%L)
    RETURNING *;
    `,
        Object.keys(project),
        Object.values(project)
    );

    const QueryResult = await client.query(querySting);

    return res.status(201).json(QueryResult.rows[0]);
};

export const newProjectTech = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const id: number = +req.params.id;
    const tech = req.body;

    // if (tech.name == undefined || tech.length > 1) {
    //     return res.status(400).json({
    //         message: "Required key are: name",
    //     });
    // }

    const queryTech: string = `
    SELECT * FROM technologies;
    `;
    const queryTechResult: QueryResult = await client.query(queryTech);
    const technologies = queryTechResult.rows;
    const techFind = technologies.find((el) => el.name == tech.name);

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const date = today.toISOString();

    const queryString: string = `
    
    INSERT INTO 
        projects_technologies("addedIn", "id_project", "technology_id")
    VALUES 
        ($1, $2, $3)
    RETURNING *;
    `;

    const QueryConfig: QueryConfig = {
        text: queryString,
        values: [date, id, techFind.id],
    };

    const queryResult = await client.query(QueryConfig);

    return res.json(queryResult.rows);
};
