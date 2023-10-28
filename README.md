Program Id: BVDdEviu7f1GzqtvYuV9dQBWft7toFQYM8vFeEHnH7ME

## Magical NFTs on Solana 

**Magical NFTs The magic of AI and the power of blockchain converge. Magical NFTs is the Ai generative NFTs for PFPs, game assets, metaverse avatars, and costumes.**

# Instructions

**1. Mint:  The mint instruction is responsible for creating NFT. This process is essential for introducing new tokens into the system. Based on the inputs we have (regarding color, description, and rarity), we will create gem metadata and mint our NFT.**

**2. Transfer: The transfer instruction allows tokens or NFTs to be sent from one account to another.** 

# Homepage

 
# This is the magicalnfts yaml file

```yaml

   cidl: "0.8"
info:
  name: nft
  title: Magical NFTs
  version: 0.0.1
  license:
    name: Unlicense
    identifier: Unlicense
types:
  MagicalNftMetadata:
    solana:
      seeds:
        - name: metadata  
        - name: mint
          type: sol:pubkey
    fields:
      - name: name
        type: string
        solana:
          attributes: [ cap:36 ]
      - name: symbol
        type: string
        solana:
          attributes: [ cap:16 ]
      - name: image
        type: string
        solana:
          attributes: [ cap:255 ]
      - name: animation_url
        type: string
        solana:
          attributes: [ cap:255 ]
      - name: external_url
        type: string
        solana:
          attributes: [ cap:255 ] 
      - name: description
        type: string
        solana:
          attributes: [ cap:255 ] 
      - name: category
        type: string
        solana:
          attributes: [ cap:36 ]
        solana:
          attributes: [ cap:255 ]
      - name: mint
        type: sol:pubkey
      - name: authority
        type: sol:pubkey
      - name: assoc_account
        type: rs:option<sol:pubkey>
methods:
  - name: mint
    uses:
      - csl_spl_token.initialize_mint2
      - csl_spl_assoc_token.create
      - csl_spl_token.mint_to
      - csl_spl_token.set_authority
    inputs:
      - name: mint
        type: csl_spl_token.Mint
        solana:
          attributes: [ init ]
      - name: metadata
        type: MagicalNftMetadata
        solana:
          attributes: [ init ]
          seeds:
            mint: mint
      - name: name
        type: string 
      - name: symbol
        type: string 
      - name: image
        type: string 
      - name: animation_url
        type: string 
      - name: external_url
        type: string  
      - name: description
        type: string
      - name: category
        type: string 
  - name: transfer
    uses:
      - csl_spl_assoc_token.create
      - csl_spl_token.transfer_checked
    inputs:
      - name: mint
        type: csl_spl_token.Mint
      - name: metadata
        type: MagicalNftMetadata
        solana:
          attributes: [ mut ]
          seeds:
            mint: mint
```

# To generate code

```javascript
    codigo solana generate risein.yaml
```

# Step 1: Mint Function

```javascript

    pub fn mint(
            program_id: &Pubkey,
            for_initialize_mint_2: &[&AccountInfo],
            for_create: &[&AccountInfo],
            for_mint_to: &[&AccountInfo],
            for_set_authority: &[&AccountInfo],
            mint: &Account<spl_token::state::Mint>,
            gem: &mut AccountPDA<GemMetadata>,
            funding: &AccountInfo,
            assoc_token_account: &AccountInfo,
            wallet: &AccountInfo,
            owner: &AccountInfo,
            color: String,
            rarity: String,
            short_description: String,
        ) -> ProgramResult {
            gem.data.color = color;
            gem.data.rarity = rarity;
            gem.data.short_description = short_description;
            gem.data.mint = *mint.info.key;
            gem.data.assoc_account = Some(*assoc_token_account.key);

            csl_spl_token::src::cpi::initialize_mint_2(for_initialize_mint_2, 0, *wallet.key, None)?;
            csl_spl_assoc_token::src::cpi::create(for_create)?;
            csl_spl_token::src::cpi::mint_to(for_mint_to, 1)?;
            csl_spl_token::src::cpi::set_authority(for_set_authority, 0, None)?;

            Ok(())
     }
```

# Step 2: Implement Transfer

```javascript

  pub fn mint(
    program_id: &Pubkey,
    for_initialize_mint_2: &[&AccountInfo],
    for_create: &[&AccountInfo],
    for_mint_to: &[&AccountInfo],
    for_set_authority: &[&AccountInfo],
    mint: &Account<spl_token::state::Mint>,
    metadata: &mut AccountPDA<MagicalNftMetadata>,
    funding: &AccountInfo,
    assoc_token_account: &AccountInfo,
    wallet: &AccountInfo,
    owner: &AccountInfo,
    name: String,
    symbol: String,
    image: String,
    animation_url: String,
    external_url: String,
    description: String,
    category: String,
) -> ProgramResult {
    metadata.data.name = name;
    metadata.data.symbol = symbol;
    metadata.data.image = image;
    metadata.data.animation_url = animation_url;
    metadata.data.external_url = external_url;
    metadata.data.description = description;
    metadata.data.category = category;
    metadata.data.mint = *mint.info.key;
    metadata.data.assoc_account = Some(*assoc_token_account.key);

    csl_spl_token::src::cpi::initialize_mint_2(for_initialize_mint_2, 0, *wallet.key, None)?;
    csl_spl_assoc_token::src::cpi::create(for_create)?;
    csl_spl_token::src::cpi::mint_to(for_mint_to, 1)?;
    csl_spl_token::src::cpi::set_authority(for_set_authority, 0, None)?;

    Ok(())
}
``` 
 
# After this build program using command

```javascript

   cargo build-sbf

```

# Setup the config file 

```javascript
solana config set --url devnet
```

# Then deploy the program 
**go to program directory**
```javascript
solana program deploy target/deploy/nft.so 

```

# Here is the frontend


 