$(() => {
  const fillInGrid = (template) => {
    switch (template) {
      case "Tank Top":
        line(0, 0, 5, 0, "#D3C2CA");
        line(0, 1, 5, 1, "#D3C2CA");
        line(0, 2, 5, 2, "#D3C2CA");
        line(0, 3, 5, 3, "#D3C2CA");
        line(0, 4, 5, 4, "#D3C2CA");
        line(0, 5, 5, 5, "#D3C2CA");
        line(0, 6, 4, 6, "#D3C2CA");
        line(0, 7, 4, 7, "#D3C2CA");
        line(0, 8, 4, 8, "#D3C2CA");
        line(0, 9, 3, 9, "#D3C2CA");
        line(0, 10, 2, 10, "#D3C2CA");
        line(0, 11, 0, 11, "#D3C2CA");

        line(12, 0, 19, 0, "#D3C2CA");
        line(12, 1, 19, 1, "#D3C2CA");
        line(12, 2, 19, 2, "#D3C2CA");
        line(12, 3, 19, 3, "#D3C2CA");
        line(12, 4, 19, 4, "#D3C2CA");
        line(13, 5, 18, 5, "#D3C2CA");

        line(26, 0, 31, 0, "#D3C2CA");
        line(26, 1, 31, 1, "#D3C2CA");
        line(26, 2, 31, 2, "#D3C2CA");
        line(26, 3, 31, 3, "#D3C2CA");
        line(26, 4, 31, 4, "#D3C2CA");
        line(26, 5, 31, 5, "#D3C2CA");
        line(27, 6, 31, 6, "#D3C2CA");
        line(27, 7, 31, 7, "#D3C2CA");
        line(27, 8, 31, 8, "#D3C2CA");
        line(28, 9, 31, 9, "#D3C2CA");
        line(29, 10, 31, 10, "#D3C2CA");
        line(31, 11, 31, 11, "#D3C2CA");
        break;

      case "Long-sleeve Dress Shirt":
        line(0, 0, 5, 0, "#D3C2CA");
        line(0, 1, 5, 1, "#D3C2CA");
        line(0, 2, 5, 2, "#D3C2CA");
        line(0, 3, 5, 3, "#D3C2CA");
        line(0, 4, 5, 4, "#D3C2CA");
        line(0, 5, 5, 5, "#D3C2CA");
        line(0, 6, 4, 6, "#D3C2CA");
        line(0, 7, 4, 7, "#D3C2CA");
        line(0, 8, 4, 8, "#D3C2CA");
        line(0, 9, 3, 9, "#D3C2CA");
        line(0, 10, 2, 10, "#D3C2CA");
        line(0, 11, 0, 11, "#D3C2CA");

        line(14, 0, 17, 0, "#D3C2CA");
        line(14, 1, 17, 1, "#D3C2CA");
        line(14, 2, 17, 2, "#D3C2CA");
        line(15, 3, 16, 3, "#D3C2CA");

        line(26, 0, 31, 0, "#D3C2CA");
        line(26, 1, 31, 1, "#D3C2CA");
        line(26, 2, 31, 2, "#D3C2CA");
        line(26, 3, 31, 3, "#D3C2CA");
        line(26, 4, 31, 4, "#D3C2CA");
        line(26, 5, 31, 5, "#D3C2CA");
        line(27, 6, 31, 6, "#D3C2CA");
        line(27, 7, 31, 7, "#D3C2CA");
        line(27, 8, 31, 8, "#D3C2CA");
        line(28, 9, 31, 9, "#D3C2CA");
        line(29, 10, 31, 10, "#D3C2CA");
        line(31, 11, 31, 11, "#D3C2CA");

        line(0, 30, 2, 30, "#D3C2CA");
        line(0, 31, 6, 31, "#D3C2CA");

        line(29, 30, 31, 30, "#D3C2CA");
        line(25, 31, 31, 31, "#D3C2CA");

        break;
    }
  };

  fillInGrid("Long-sleeve Dress Shirt");
});
