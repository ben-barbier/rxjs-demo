import {Sprint} from "./sprint";

export class Team {

    constructor(public id?: number,
                public name?: string,
                public mood?: string,
                public logo?: string,
                public slogan?: string,
                public agile?: boolean,
                public notes?: string,
                public site?: string,
                public nextDemo?: Date,
                public idDemande?: number,
                public actualSprint?: Sprint) {}
}
