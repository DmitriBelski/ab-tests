import { Site } from './models/Site'
import { Test } from './models/Test'

export class TestsApi {
  private readonly API_ROOT = 'http://localhost:3100/';

  async fetchTests (): Promise<Test[]> {
    const url = new URL(`${this.API_ROOT}tests`)
    return fetch(url.toString()).then((res) => res.json())
  }

  async fetchTest (testId: Test['id']): Promise<Test> {
    const url = new URL(`${this.API_ROOT}tests/${testId}`)
    return fetch(url.toString()).then((res) => res.json())
  }

  async fetchSite (siteId: Site['id']): Promise<Site> {
    const url = new URL(`${this.API_ROOT}sites/${siteId}`)
    return fetch(url.toString()).then((res) => res.json())
  }
}
