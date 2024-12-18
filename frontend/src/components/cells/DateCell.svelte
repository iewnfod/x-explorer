<script lang="ts">
    export let value: number;

    let dateStr = value ? (new Date(value)).toLocaleDateString() : "-";
</script>

<div>{dateStr}</div>
