export interface TechStack {
  name: string
  icon: string
}

export interface Project {
  id: string
  name: string
  description: string
  github: string
  techStack: TechStack[]
}
