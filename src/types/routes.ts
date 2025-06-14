type ProjectRoute = `/portfolio/projects/${string}`

type Routes = ProjectRoute | (string & {}); // hack allows strings

export type {Routes}