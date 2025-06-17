#!/bin/bash
set -e

# Displays the available scripts and collects the user choice
show_options() {
  echo "[1] App Launch"
  echo "[2] Wishlist Tab"
  echo "[3] Product Listing Page (PLP)"
  echo "[4] Product Details Page (PDP)"
  read -p "Please select an option [1-4]: " choice
}

# Ensures the results directory for the current application version exists. If the directory
# ./performance/results/v<version> does not exist, it will be created based on the version
# specified in the package.json
create_results_folder_if_necessary() {
  appVersion=$(cat ./package.json | jq -r ".version")
  versionPath="./performance/results/v$appVersion"

  if [ ! -d "$versionPath" ]; then
    echo "Creating directory '$versionPath'."
    
    if [ ! -d "./performance/results" ]; then
      mkdir "./performance/results"
    fi
    
    mkdir "$versionPath"
  fi
}

# Checks if the required CLI tools are installed and accessible on the system's PATH.
check_for_cli_tools() {
  local tools=("jq" "flashlight")
  local install_cmds=("run: brew install jq" "visit: https://docs.flashlight.dev/")

  for i in "${!tools[@]}"; do
    if ! command -v "${tools[$i]}" > /dev/null 2>&1; then
      echo "${tools[$i]} is not installed. Please ${install_cmds[$i]} to install."
      exit 1
    fi
  done
}

check_for_cli_tools
create_results_folder_if_necessary
echo "Please select an option:"

while true; do
  show_options

  case $choice in
    1)
      flashlight test --bundleId "dev.bonesyblue.turboshop" --testCommand "maestro test ./performance/flows/app-launch.yaml" --resultsTitle "App Launch (v$appVersion)" --resultsFilePath "./performance/results/v$appVersion/app-launch.json" --iterationCount 3
      exit 0
      ;;
    2)
      flashlight test --bundleId "dev.bonesyblue.turboshop" --testCommand "maestro test ./performance/flows/tab-wishlist.yaml" --resultsTitle "Wishlist Tab (v$appVersion)" --resultsFilePath "./performance/results/v$appVersion/tab-wishlist.json" --iterationCount 3
      exit 0
      ;;
    3)
      read -p "Please enter the name of the first product on the 'Tops' product listing page: " title
      flashlight test --bundleId "dev.bonesyblue.turboshop" --testCommand "maestro test -e PRODUCT_TITLE='$title' ./performance/flows/plp.yaml" --resultsTitle "Product Listing Page (v$appVersion)" --resultsFilePath "./performance/results/v$appVersion/plp.json" --iterationCount 3
      exit 0
      ;;
    4)
      read -p "Please enter the name of the first product on the 'Tops' product listing page: " title
      flashlight test --bundleId "dev.bonesyblue.turboshop" --testCommand "maestro test -e PRODUCT_TITLE='$title' ./performance/flows/pdp.yaml" --resultsTitle "Product Details Page (v$appVersion)" --resultsFilePath "./performance/results/v$appVersion/pdp.json" --iterationCount 3
      exit 0
      ;;
    *)
      echo "Invalid choice! Please select a number between 1 and 10:"
      ;;
  esac
done
