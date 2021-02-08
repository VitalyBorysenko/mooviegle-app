import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {
  searchArray!: any[];
  searchText!: string;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(res => {
      this.searchText = res.searchText;
      this.loadList(this.searchText);
    })
  }

  ngOnInit(): void {
  }

  private _subs: Subscription = new Subscription();

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  loadList(title: string) {
    this._subs.add(this.searchService.findMovies(title).subscribe((data: any) => {
      this.searchArray = data['results'];
    }))
  }

  getImgUrl(index: number) {
    const imgSrc = `https://image.tmdb.org/t/p/w500`;
    return imgSrc + this.searchArray[index].poster_path;
  }

}
