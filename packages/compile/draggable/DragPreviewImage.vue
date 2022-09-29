<script lang="ts">
function convertImageToCanvas(name: string, width: number, height: number) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  const dpr = window.devicePixelRatio;

  ctx.scale(dpr, dpr);

  ctx.fillStyle = '#2468f2';
  ctx.fillRect(0, 0, width, height);

  ctx.font = '12px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff';
  ctx.fillText(name, width / 2, height / 2);

  return canvas.toDataURL();
}

function resizedataURL(datas: string, width: number, height: number): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = function onload() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      const dataURI = canvas.toDataURL();

      resolve(dataURI);
    };
    img.src = datas;
  });
}

export default defineComponent({
  props: {
    connect: {
      type: Function,
      required: true
    },
    name: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    watchEffect(async () => {
      let connected = false;
      const img = new Image();
      const height = 10;
      const width = 50;

      img.src = convertImageToCanvas(props.name, width, height);

      img.onload = () => {
        props.connect(img);
        connected = true;
      };
      return () => {
        if (connected) {
          props.connect(null);
        }
      };
    });

    return () => null;
  }
});
</script>
