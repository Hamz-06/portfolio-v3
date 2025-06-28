type ProjectRoute = `/portfolio/projects/${string}` | `/portfolio`

type Routes = ProjectRoute | (string & {}); // hack allows strings

export type {Routes}