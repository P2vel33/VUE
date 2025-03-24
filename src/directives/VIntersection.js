export default {
  name: "intersection",
  mounted(el, binding) {
    // console.log(el, binding);
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        // console.log(totalPages.value);
        binding.value();
      }
    };
    const run = new IntersectionObserver(callback, options);
    run.observe(el);
  },
};
