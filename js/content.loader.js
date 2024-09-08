document.addEventListener("DOMContentLoaded", function () {
    const featurettes = document.querySelectorAll(".content-loader");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        {
            threshold: 0.1,
        }
    );

    featurettes.forEach((featurette) => {
        observer.observe(featurette);
    });
});
