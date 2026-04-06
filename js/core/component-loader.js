export async function LoadComponent(id, file) {
  try {
    const el = document.getElementById(id);
    if (!el) return;

    const res = await fetch(`/components/${file}`);
    if (!res.ok) throw new Error(`Failed to load ${file}`);

    const html = await res.text();
    el.innerHTML = html;
  } catch (err) {
    console.error(err);
  }
}