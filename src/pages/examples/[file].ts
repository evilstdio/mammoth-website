import type { APIRoute, GetStaticPaths } from "astro";
import { examples } from "../../data/examples";

export const getStaticPaths: GetStaticPaths = () =>
  examples.map((example) => ({
    params: { file: example.file },
    props: { code: example.code },
  }));

export const GET: APIRoute = ({ props }) =>
  new Response(props.code + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
