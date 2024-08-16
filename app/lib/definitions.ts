// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type AllEventsMetaData = {
    cout: number;
    total_nodes: number;
    total_ip: number;
    total_files: number;
}

export type EventDataMeta = {
    num_commands: number;
    num_ip: number;
    num_file: number;
    start_time: number;
    end_time: number;
    duration: number;
};

export type EventDataOverview = {
    id: string;
    name: string;
    data: EventDataMeta;
};