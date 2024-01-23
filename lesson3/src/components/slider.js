const Slider = {
    render: () => {
      return `
      <div class="slide h-[285px] relative">
      <img
        src="/slider.png"
        alt=""
        class="max-h-full min-w-full object-cover"
      />
      <div
        class="btn-slide flex justify-between min-w-full absolute top-2/4"
      >
        <div class="prev ml-4">
          <i class="fa-solid fa-angle-left"></i>
        </div>
        <div class="next mr-4">
          <i class="fa-solid fa-angle-right"></i>
        </div>
      </div>
    </div>
      `;
    },
  };
  export default Slider;