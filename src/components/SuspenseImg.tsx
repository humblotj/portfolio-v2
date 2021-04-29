/* eslint-disable no-underscore-dangle */
const imgCache: any = {
  __cache: {},
  read(src: any) {
    if (!src) {
      return null;
    }

    if (!this.__cache[src]) {
      this.__cache[src] = new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          this.__cache[src] = true;
          resolve(this.__cache[src]);
        };
        img.src = src;
        setTimeout(() => resolve({}), 7000);
      }).then((img) => {
        this.__cache[src] = true;
      });
    }

    if (this.__cache[src] instanceof Promise) {
      throw this.__cache[src];
    }
    return this.__cache[src];
  },
  clearImg: (src: any) => {
    delete (this as any).__cache[src];
  },
};

interface Props {
  src: string
}

const SuspenseImg = ({ src, ...rest }: Props) => {
  imgCache.read(src);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <img alt="" src={src} {...rest} />;
};

export default SuspenseImg;
