import Link from 'next/link';

const sponsors = [
  {
    name: 'AlphaLand',
    logo: 'https://static.wixstatic.com/media/c5947c_d9ffd0de2d2343cd87bebb8830f160c9~mv2.png',
    url: 'https://officialalphaland.com/',
  },
  {
    name: 'Summer Shredding',
    logo: 'https://static.wixstatic.com/media/c5947c_02c14ec526d34acca8ba3fc922b08b37~mv2.png',
    url: 'https://summershredding.com/',
  },
  {
    name: 'HTX Posedown',
    logo: 'https://static.wixstatic.com/media/c5947c_1c4393227cf943bc88e3189cc5d8dce2~mv2.png',
    url: 'https://www.instagram.com/htx_posedown/',
  },
  {
    name: 'Muscle Beach',
    logo: 'https://musclebeachclassic.com/wp-content/uploads/2024/08/image2-e1723822876553.png',
    url: 'https://musclebeachclassic.com/',
  },
];

export default function SponsorsSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary mb-3">
            Proud to Sponsor and Partner with&hellip;
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            Supporting the best in fitness and beauty communities.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {sponsors.map((sponsor) => (
            <Link
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 transition-all duration-300 hover:scale-110"
              title={sponsor.name}
            >
              <div className="relative w-[140px] h-[80px] md:w-[180px] md:h-[100px] flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 rounded-lg">
                {sponsor.logo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    className="max-w-full max-h-full object-contain transition-opacity duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg px-3">
                    <span className="text-white font-headline font-bold text-lg md:text-xl text-center leading-tight">
                      {sponsor.name}
                    </span>
                  </div>
                )}
              </div>
              <span className="text-sm font-body font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">
                {sponsor.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
