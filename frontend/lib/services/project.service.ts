import { CrudAbstract } from '../abstracts/crud.abstract';
import { Project } from '../types/project.types';

export class ProjectService extends CrudAbstract<Project> {
  protected endpoint = 'projects';
}
