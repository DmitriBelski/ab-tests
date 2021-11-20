import { Site } from './models/Site'
import { Test } from './models/Test'

export class TestsApi {
  private readonly API_ROOT = 'http://localhost:3100/';

  private async fetchAPI<T> (route: string, id?: number): Promise<T> {
    const url = new URL(`${route}/${id || ''}`, this.API_ROOT)
    return fetch(url.toString())
      .then((res) => res.json())
      .catch((error) => console.log('Fetch Error:', error))
  }

  async fetchTests (): Promise<Test[]> {
    return await this.fetchAPI<Test[]>('tests')
  }

  async fetchTest (testId: Test['id']): Promise<Test> {
    return await this.fetchAPI<Test>('tests', testId)
  }

  async fetchSite (siteId: Site['id']): Promise<Site> {
    return await this.fetchAPI<Site>('sites', siteId)
  }
}
