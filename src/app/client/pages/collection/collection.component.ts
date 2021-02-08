import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  collectionList!: any[];
  constructor(
    private collectionService: CollectionService,
    private tokenStorage: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.loadCollection();
  }

  private _subs: Subscription = new Subscription();

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  loadCollection() {
    if (this.tokenStorage.getToken()) {
      this._subs.add(this.collectionService.getCollection().subscribe((data: any) => {
        this.collectionList = data.filter((col: any) => col.user_id === this.tokenStorage.getUserId()
        );
      }));
    }
  }

  getImgUrl(index: number) {
    const imgSrc = `https://image.tmdb.org/t/p/w500`;
    return imgSrc + this.collectionList[index].poster_path;
  }

}
