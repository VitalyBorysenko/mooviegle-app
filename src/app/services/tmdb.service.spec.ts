import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TmdbService } from './tmdb.service';
import { environment } from 'src/environments/environment';

describe('TmdbService', () => {
  let service: TmdbService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TmdbService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should build poster url', () => {
    expect(service.getPosterUrl('/abc.jpg')).toBe(`${environment.tmdbImageBaseUrl}/abc.jpg`);
    expect(service.getPosterUrl(null)).toBe('');
  });

  it('should search movies with encoded query', () => {
    service.searchMovies('rambo 2').subscribe((response) => {
      expect(response.results.length).toBe(1);
    });

    const req = httpMock.expectOne((request) => request.url.includes('query=rambo%202'));
    req.flush({ page: 1, results: [{ id: 1, title: 'Rambo 2', poster_path: null }], total_pages: 1, total_results: 1 });
  });
});
