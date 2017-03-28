import {Component} from '@angular/core';
import * as Rx from 'rxjs';
import {Http, Response} from "@angular/http";
import Data from "./data";
import {Team} from "../model/team";
import {Observable} from "rxjs";
import {Sprint} from "../model/sprint";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app works!';

    public tab: string[] = [];

    constructor(private http: Http) {
        // this.demo1();
        // this.demo2();
        this.demo3();
    }

    demo1 = (): void => {
        Rx.Observable // Objet utilitaire
            .interval(1000) //Create an observable that emits a value every second
            .bufferCount(3) //After three values are emitted, pass on as an array of buffered values
            .subscribe(val => console.log('Buffered Values:', val)); //Print values to console ex. output [0,1,2]...[3,4,5]
    };



    demo2 = (): void => {

        this.http.get('app/data.json') // retourne une "Response" contenant un seul élément de type Tableau

            // .map() transforme chaque valeur de la source dans une méthode de transformation
            // hors, dans notre cas, data.json contien un seul élément (qui est un tableau)
            // du coup, la fonction de map n'est exécutée qu'une fois
            // --
            // .map(), s'attends à avoir un flux de n éléments successifs


            // .flatMap() transforme chaque valeur de la source dans une méthode de transformation
            // PUIS l'applatie sur 1 niveau.
            // Dans notre cas, data.json contient un seul élément (qui est un tableau)
            // du coup, la fonction de flatMap n'est exécutée qu'une fois
            // --
            // .flatMap(), s'attends à avoir un flux de n éléments successifs

            .flatMap((response: Response) => response.json()) // response.json() renvoie un  Data[]


            // On n'envoie pas des tableaux aux filters mais des éléments.
            // Les éléments sont filtrés éléments par éléments
            .filter((user: Data) => user.agile === true)

            .flatMap((user: Data) => user.tags)

            .map(tag => tag.toUpperCase())

            // .bufferCount(1000)

            .subscribe(result => {
                this.tab.push(result);

                // this.tab = result;

                console.log(result);
            });

            //Concat ?

    }

    demo3 = ():void => {

        class Demo3 {

            teams: Team[] = [];



            getAgileTeams(): Observable<Team> {
                return this.http.get('/data/teams.json')
                    .flatMap((response: Response) => response.json())
                    .filter((team: Team) => team.agile === true);
            }

            getActualSprint(teamName: String): Observable<Sprint> {
                return this.http.get('/data/sprint.json')
                    .flatMap((response: Response) => response.json());
            }

            getTeamWithActualSprint(team: Team): Team {
                return this.getActualSprint(team.name)
                    .map((sprint: Sprint) => {
                        team.actualSprint = sprint;
                        return team;
                    });
            }

            constructor(private http: Http) {
                this.getAgileTeams()
                    .do((e) => {
                        debugger;
                        return e; // Ici, on a une team (pas un tableau)
                    })
                    .map(team => this.getTeamWithActualSprint(team))
                    .do((e) => {
                        debugger;
                        return e; // Problème : Ici, on a un Observable de team
                    })
                    .subscribe(team => {
                        this.teams.push(team);
                    });
            }

        }

        const demo3 = new Demo3(this.http);

    }


    // flatMap ?
    // 4 types d'objets de rx ?
    // appel type
    // pattern push / pattern pull

    // 1) Observer / Observable
    /**
     * C'est l'observer qui réagit aux changements de l'Observable.
     * Observable = flux de données
     * Observer = s'abonne au flux de données et applique des traitements dessus au fur et a mesure que les data arrivent
     *
     * On peut décrire des Observer et des Observables mais aucun traitement n'est lancé tant que la fonction subscribe du Observer n'est pas appelée
     *
     * On définit le flux sur l'Observable
     *
     * On
     *
     */

}


