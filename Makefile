
DIR_BUILD = build
DIR_TOOLS = tools


# Initialization
init:
	git submodule update --init
	for tool in $(DIR_TOOLS)/*; do \
	  mkdir -p $(DIR_BUILD)/`basename $$tool`; \
	done

clean:
	rm -rf $(DIR_BUILD)

seqtk: init
	emcc $(DIR_TOOLS)/$@/$@.c \
	  -s USE_ZLIB=1 \
	  -s FORCE_FILESYSTEM=1 \
	  -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' \
	  -s ALLOW_MEMORY_GROWTH=1 \
	  -o $(DIR_BUILD)/$@/$@.js

