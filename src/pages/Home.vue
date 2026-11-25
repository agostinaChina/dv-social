<script>
    import BaseH1 from '../components/BaseH1.vue';

export default{
    name: 'Home',
    components: { BaseH1, },
}

</script>

<template>
    <section class="py-6 md:py-8">
        <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div class="p-8 md:p-10 lg:p-12">

                <span class="inline-block -ml-1 mb-3 rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
                    Escuela Da Vinci
                </span>

            <BaseH1 class="mt-3">Home</BaseH1> 


                <h2 class="mt-5 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-slate-800 md:text-5xl">
                    Un lugar para conectar, compartir y crecer.
                </h2>

                <p class="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                    Bienvenidos a DV Social, la comunidad estudiantil de Escuela Da Vinci.
                    Un espacio para conectar con otros estudiantes e intercambiar ideas y experiencias.
                </p>

                <div class="mt-8 flex flex-wrap gap-3">
                    <span class="rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-800">
                        Comunidad
                    </span>

                    <span class="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-800">
                        Creatividad
                    </span>

                    <span class="rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-800">
                        Conexión
                    </span>
                </div>

            </div>

            <div class="h-2 bg-linear-to-r from-violet-600 via-fuchsia-500 to-orange-400"></div>
        </div>

        <div class="mt-8 grid gap-5 md:grid-cols-3">

         
<article class="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg">
    <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">
        <img
            src="/icons/chat.svg"
            alt=""
            class="h-10 w-10 object-contain"
        />
    </div>

    <h3 class="text-lg font-bold text-slate-800">
        Conversaciones
    </h3>

    <p class="mt-2 text-sm leading-6 text-slate-600">
        Un espacio para intercambiar ideas y conversar con otros estudiantes.
    </p>
</article>


          <article class="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg">
    <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
        <img
            src="/icons/creatividad.svg"
            alt=""
            class="h-10 w-10 object-contain"
        />
    </div>
                <h3 class="text-lg font-bold text-slate-800">
                    Creatividad
                </h3>

                <p class="mt-2 text-sm leading-6 text-slate-600">
                    Un entorno para compartir intereses, experiencias e ideas.
                </p>
            </article>

           
<article class="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg">
    <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100">
        <img
            src="/icons/comunidad.svg"
            alt=""
            class="h-10 w-10 object-contain"
        />
    </div>

    <h3 class="text-lg font-bold text-slate-800">
        Comunidad Da Vinci
    </h3>

    <p class="mt-2 text-sm leading-6 text-slate-600">
        Un espacio compartido por quienes forman parte de la institución.
    </p>
</article>

        </div>

    </section>
</template>
