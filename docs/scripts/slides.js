import { SfeirThemeInitializer } from 'sfeir-school-theme';

// One method per module
function schoolSlides() {
  return ['00-school/00-TITLE.md', '00-school/speaker-jef.md'];
}

function introSlides() {
  return ['intro/00-TITLE.md', 'intro/99-lab-workshop-example.md'];
}

export function formation() {
  return [
    //
    ...schoolSlides(), //
    ...introSlides(), //
  ].map((slidePath) => {
    return { path: slidePath };
  });
}

SfeirThemeInitializer.init(formation);
