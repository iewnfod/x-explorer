<script lang="ts">
    export let value: number;

    let sizeStr = value ? `${value}b` : "-";
</script>

<div>{sizeStr}</div>
