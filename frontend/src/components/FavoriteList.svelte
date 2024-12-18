<script>
    import {Accordion, Button, Text} from "@svelteuidev/core";
    import {preferences} from "../preference";
    import GrayChevronDown from "./base/GrayChevronDown.svelte";
    import {setPath} from "../data";
</script>

<div>
    <Accordion chevron={GrayChevronDown} defaultValue="favorites">
        <Accordion.Item value="favorites">
            <div slot="control">
                <Text size="xs" weight="semibold" color="gray">
                    Favorites
                </Text>
            </div>
            <div class="link-container">
                {#each $preferences.favorites as favorite}
                    <Button
                        style="padding: 0; margin: 0; background-color: transparent; color: gray"
                        variant="white"
                        size="xs"
                        on:click={() => setPath(favorite)}
                    >
                        {favorite}
                    </Button>
                {/each}
            </div>
        </Accordion.Item>
    </Accordion>
</div>

<style>
    .link-container {
        display: flex;
        flex-direction: column;
        transform: translateY(calc(0px - var(--medium-large-margin)));
        padding-left: var(--medium-small-margin);
    }
</style>
