/**
 * Models.ts
 */

export interface Task {
    //id: string;
    itemName: string;
    description: string;
    deadline: Date;
    complete: boolean;
}