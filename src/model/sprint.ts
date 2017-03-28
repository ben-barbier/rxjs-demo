export class Sprint {

    constructor(public id?: number,
                public dateDebut?: Date,
                public dateFin?: Date,
                public lienBurndown?: string,
                public lienTaches?: string,
                public type?: string,
                public cle?: string,
                public project?: string,
                public sprintName?: string,
                public nbRetoursNonAnalyse?: number){}
}
