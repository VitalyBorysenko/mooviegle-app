import { Component, OnInit, ViewChild } from '@angular/core';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { OwlCarousel } from 'ngx-owl-carousel';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-pop-slider',
  templateUrl: './pop-slider.component.html',
  styleUrls: ['./pop-slider.component.scss']
})
export class PopSliderComponent implements OnInit {
  arrowLeft = faCaretLeft;
  arrowRight = faCaretRight;

  popularData: any;

  constructor(
    public categoryService: CategoryService,
  ) {
  }

  @ViewChild('owlElement', { static: false })
  owlElement!: OwlCarousel;

  popSlideOptions = {
    loop: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        dots: false
      },
      540: {
        items: 3,
        dots: true
      },
      768: {
        items: 5,
        dots: true
      }
    }
  };

  ngOnInit(): void {
    this.loadPop();
  }

  private _subs: Subscription = new Subscription();
  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  loadPop() {
    this._subs.add(this.categoryService.findPopular().subscribe((data: any) => {
      this.popularData = data['results']
      // .slice(0, 5);
    }))
  }

  getImgUrl(index: number) {
    const imgSrc = `https://image.tmdb.org/t/p/w500`;
    return imgSrc + this.popularData[index].poster_path;
  }

  moveRight() {
    this.owlElement.next([200]);
  }
  moveLeft() {
    this.owlElement.previous([200]);
  }

}
