import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollectionService } from './collection.service';
import { environment } from 'src/environments/environment';

describe('CollectionService', () => {
  let service: CollectionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, BrowserAnimationsModule],
    });
    service = TestBed.inject(CollectionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should map collection records into an array', () => {
    service.getCollection().subscribe((items) => {
      expect(items.length).toBe(1);
      expect(items[0].title).toBe('Test movie');
    });

    const req = httpMock.expectOne(environment.firebaseDatabaseUrl + 'api/filmsCollection.json');
    expect(req.request.method).toBe('GET');
    req.flush({ abc123: { id: 1, title: 'Test movie', user_id: 'u1' } });
  });

  it('should propagate permission errors', () => {
    let failed = false;

    service.getCollection().subscribe({
      error: () => {
        failed = true;
      },
    });

    const req = httpMock.expectOne(environment.firebaseDatabaseUrl + 'api/filmsCollection.json');
    req.flush('Permission denied', { status: 401, statusText: 'Unauthorized' });
    expect(failed).toBe(true);
  });
});
